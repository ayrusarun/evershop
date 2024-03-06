const { getConfig } = require('@evershop/evershop/src/lib/util/getConfig');

module.exports = {
  Setting: {
    razorpayPaymentStatus: (setting) => {
      const razorpayConfig = getConfig('system.razorpay', {});
      if (razorpayConfig.status) {
        return razorpayConfig.status;
      }
      const razorpayPaymentStatus = setting.find(
        (s) => s.name === 'razorpayPaymentStatus'
      );
      if (razorpayPaymentStatus) {
        return parseInt(razorpayPaymentStatus.value, 10);
      } else {
        return 0;
      }
    },
    razorpayDislayName: (setting) => {
      const razorpayDislayName = setting.find(
        (s) => s.name === 'razorpayDislayName'
      );
      if (razorpayDislayName) {
        return razorpayDislayName.value;
      } else {
        return 'RazorPay';
      }
    },
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
    }
  }
};
