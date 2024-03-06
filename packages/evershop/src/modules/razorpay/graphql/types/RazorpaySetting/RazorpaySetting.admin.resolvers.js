const { getConfig } = require('@evershop/evershop/src/lib/util/getConfig');

module.exports = {
  Setting: {
    razorpayPublishableKey: (setting) => {
      const razorpayConfig = getConfig('system.razorpay', {});
      if (razorpayConfig.publishableKey) {
        return razorpayConfig.publishableKey;
      }
      const razorpayPublishableKey = setting.find(
        (s) => s.name === 'razorpayPublishableKey'
      );
      if (razorpayPublishableKey) {
        return razorpayPublishableKey.value;
      } else {
        return null;
      }
    },
    razorpaySecretKey: (setting, _, { user }) => {
      const razorpayConfig = getConfig('system.razorpay', {});
      if (razorpayConfig.secretKey) {
        return `${razorpayConfig.secretKey.substr(
          0,
          5
        )}*******************************`;
      }
      if (user) {
        const razorpaySecretKey = setting.find(
          (s) => s.name === 'razorpaySecretKey'
        );
        if (razorpaySecretKey) {
          return razorpaySecretKey.value;
        } else {
          return null;
        }
      } else {
        return null;
      }
    },
    razorpayEndpointSecret: (setting, _, { user }) => {
      const razorpayConfig = getConfig('system.razorpay', {});
      if (razorpayConfig.endpointSecret) {
        return `${razorpayConfig.endpointSecret.substr(
          0,
          5
        )}*******************************`;
      }
      if (user) {
        const razorpayEndpointSecret = setting.find(
          (s) => s.name === 'razorpayEndpointSecret'
        );
        if (razorpayEndpointSecret) {
          return razorpayEndpointSecret.value;
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
  }
};
