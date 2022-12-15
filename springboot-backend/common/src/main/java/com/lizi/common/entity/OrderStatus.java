package com.lizi.common.entity;

public enum OrderStatus {
  VERIFICATION {
    @Override
    public String defaultDescription() {
      return "Order isn't verification";
    }

  },

  NEW {
    @Override
    public String defaultDescription() {
      return "Chưa xác nhận";
    }

  },

  VERIFIED {
    @Override
    public String defaultDescription() {
      return "Đã xác nhận";
    }

  },

  CANCELLED {
    @Override
    public String defaultDescription() {
      return "Đã hủy";
    }
  },

  PROCESSING {
    @Override
    public String defaultDescription() {
      return "Order is being processed";
    }
  },

  PACKAGED {
    @Override
    public String defaultDescription() {
      return "Đã đóng gói";
    }
  },

  SHIPPING {
    @Override
    public String defaultDescription() {
      return "Đang giao hàng";
    }
  },

  DELIVERED {
    @Override
    public String defaultDescription() {
      return "Đã nhận hàng";
    }
  },

  RETURN_REQUESTED {
    @Override
    public String defaultDescription() {
      return "Customer sent request to return purchase";
    }
  },

  RETURNED {
    @Override
    public String defaultDescription() {
      return "Products were returned";
    }
  },

  PAID {
    @Override
    public String defaultDescription() {
      return "Customer has paid this order";
    }
  },

  REFUNDED {
    @Override
    public String defaultDescription() {
      return "Customer has been refunded";
    }
  };

  public abstract String defaultDescription();
}
