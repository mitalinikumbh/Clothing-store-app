package com.zosh.mapper;

import com.zosh.dto.CartItemDTO;
import com.zosh.modal.CartItem;

public class CartItemMapper {

    // Entity to DTO
    public static CartItemDTO toCartItemDTO(CartItem cartItem) {
        return new CartItemDTO(
                cartItem.getId(),
                cartItem.getProduct().getId(),
                cartItem.getSize(),
                cartItem.getQuantity(),
                cartItem.getPrice(),
                cartItem.getDiscountedPrice(),
                cartItem.getUserId()
        );
    }

    // DTO to Entity
    public static CartItem toCartItemEntity(CartItemDTO cartItemDTO) {
        CartItem cartItem = new CartItem();
        cartItem.setId(cartItemDTO.getId());
        // You might need to fetch product by ID in a similar way if needed
        // cartItem.setProduct(productService.findProductById(cartItemDTO.getProductId())); 
        cartItem.setSize(cartItemDTO.getSize());
        cartItem.setQuantity(cartItemDTO.getQuantity());
        cartItem.setPrice(cartItemDTO.getPrice());
        cartItem.setDiscountedPrice(cartItemDTO.getDiscountedPrice());
        cartItem.setUserId(cartItemDTO.getUserId());
        return cartItem;
    }
}
