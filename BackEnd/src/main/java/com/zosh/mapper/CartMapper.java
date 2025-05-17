package com.zosh.mapper;

import com.zosh.dto.CartDTO;
import com.zosh.modal.Cart;
import java.util.Collections;

public class CartMapper {

    // Entity to DTO
    public static CartDTO toCartDTO(Cart cart) {
        return new CartDTO(
                cart.getId(),
                cart.getUser().getId(),
                cart.getTotalItem(),
                (int) cart.getTotalPrice(),
                cart.getTotalDiscountedPrice(),
                cart.getDiscounte(),
                Collections.emptyList()  // or pass actual cart items if available
        );
    }

    // DTO to Entity
    public static Cart toCartEntity(CartDTO cartDTO) {
        Cart cart = new Cart();
        cart.setId(cartDTO.getId());
        // Assuming UserService is available to fetch the user by ID
        // cart.setUser(userService.findById(cartDTO.getUserId()));
        cart.setTotalItem(cartDTO.getTotalItems());
        cart.setTotalPrice(cartDTO.getTotalPrice());
        cart.setTotalDiscountedPrice(cartDTO.getTotalDiscountedPrice());
        cart.setDiscounte(cartDTO.getDiscountAmount());
        return cart;
    }
}
