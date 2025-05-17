package com.zosh.mapper;

import com.zosh.dto.CartItemDTO;
import com.zosh.dto.OrderItemDTO;
import com.zosh.modal.OrderItem;
import com.zosh.modal.Product;
import com.zosh.modal.Order;

public class OrderItemMapper {

    // Converts OrderItem entity to OrderItemDTO
    public static OrderItemDTO toDTO(OrderItem item) {
        OrderItemDTO dto = new OrderItemDTO();
        dto.setId(item.getId());
        dto.setOrderId(item.getOrder() != null ? item.getOrder().getId() : null);
        dto.setProductId(item.getProduct() != null ? item.getProduct().getId() : null);
        dto.setSize(item.getSize());
        dto.setQuantity(item.getQuantity());
        dto.setPrice(item.getPrice());
        dto.setDiscountedPrice(item.getDiscountedPrice());
        dto.setUserId(item.getUserId());
        dto.setDeliveryDate(item.getDeliveryDate());
        return dto;
    }

    // Converts OrderItemDTO to OrderItem entity
    public static OrderItem toEntity(OrderItemDTO dto) {
        OrderItem item = new OrderItem();
        item.setId(dto.getId());

        // Set Order entity using Order ID from DTO (may need to be set by service layer)
        if (dto.getOrderId() != null) {
            Order order = new Order();
            order.setId(dto.getOrderId());
            item.setOrder(order);
        }

        // Set Product entity using Product ID from DTO (may need to be set by service layer)
        if (dto.getProductId() != null) {
            Product product = new Product();
            product.setId(dto.getProductId());
            item.setProduct(product);
        }

        item.setSize(dto.getSize());
        item.setQuantity(dto.getQuantity());
        item.setPrice(dto.getPrice());
        item.setDiscountedPrice(dto.getDiscountedPrice());
        item.setUserId(dto.getUserId());
        item.setDeliveryDate(dto.getDeliveryDate());

        return item;
    }

    // Converts CartItemDTO to OrderItem entity
    public static OrderItem fromCartItemDTO(CartItemDTO cartItemDTO) {
        if (cartItemDTO == null) {
            return null;
        }

        OrderItem orderItem = new OrderItem();
        // Set the fields from CartItemDTO to OrderItem
        orderItem.setQuantity(cartItemDTO.getQuantity());
        orderItem.setPrice(cartItemDTO.getPrice());
        orderItem.setDiscountedPrice(cartItemDTO.getDiscountedPrice());

        // If you have a Product ID in CartItemDTO, set it here
        if (cartItemDTO.getProductId() != null) {
            Product product = new Product();
            product.setId(cartItemDTO.getProductId()); // Assuming there's a product ID
            orderItem.setProduct(product);
        }

        // Set other fields like size or delivery date as per CartItemDTO if necessary
        orderItem.setSize(cartItemDTO.getSize()); // Assuming CartItemDTO has a size field

        return orderItem;
    }
}
