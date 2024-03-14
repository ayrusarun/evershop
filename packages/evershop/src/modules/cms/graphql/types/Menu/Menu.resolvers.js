const { select, value } = require('@evershop/postgres-query-builder');
const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');

module.exports = {
  Query: {
    menu: async (root, _, { pool }) => {
      const query = select('category_id')
        .select('uuid')
        .select('parent_id')
        .select('include_in_nav')
        .select('name')
        .select('request_path')       
        .from('category', 'cat');
      query
        .leftJoin('category_description', 'des')
        .on('cat.category_id', '=', 'des.category_description_category_id');
      query
        .leftJoin('url_rewrite', 'url')
        .on('url.entity_uuid', '=', 'cat.uuid')
        .and('url.entity_type', '=', value('category'));
      query
        .where('cat.status', '=', 1)
        .and('des.url_key', 'IS NOT NULL', null)
        .and('des.url_key', '!=', '');

      const categoriesRows = await query.execute(pool);

      const categoryMap = new Map();
      const rootCategories = [];

      categoriesRows.forEach(row => {
        const { category_id, uuid, parent_id, include_in_nav, name, request_path } = row;

        const category = {
          id: category_id,
          uuid,
          parent_id,
          includeInNav: include_in_nav,
          name,
          url: request_path || buildUrl('categoryView', { uuid }),
          children: []
        };

        if (!parent_id) {
          rootCategories.push(category);
        } else {
          if (!categoryMap.has(parent_id)) {
            categoryMap.set(parent_id, []);
          }
          categoryMap.get(parent_id).push(category);
        }
      });

      const assignChildren = (category) => {
        const children = categoryMap.get(category.id);
        if (children) {
          category.children = children;
          category.children.forEach(child => assignChildren(child));
        }
      };

      rootCategories.forEach(rootCategory => assignChildren(rootCategory));

      const buildMenuItems = (categories) => categories.map(category => ({
          name: category.name,
          url: category.url,
          children: buildMenuItems(category.children) // Recursively build menu items for children
        }));

    const formattedMenuItems = rootCategories.map(rootCategory => ({
      name: rootCategory.name,
      url: rootCategory.url,
      children: buildMenuItems(rootCategory.children) // Build menu items for root category children
    }));

    return { items: formattedMenuItems };
    }
  }
};

