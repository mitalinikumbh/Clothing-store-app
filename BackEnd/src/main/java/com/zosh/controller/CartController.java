package com.zosh.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zosh.exception.CartException;
import com.zosh.exception.CartItemException;
import com.zosh.exception.ProductException;
import com.zosh.exception.UserException;
import com.zosh.dto.CartItemDTO;
import com.zosh.dto.CartDTO;
import com.zosh.dto.UserDTO;
import com.zosh.request.AddItemRequest;
import com.zosh.service.CartService;
import com.zosh.service.CartItemService;
import com.zosh.service.UserService;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;
    private final CartItemService cartItemService;
    private final UserService userService;

    public CartController(CartService cartService, CartItemService cartItemService, UserService userService) {
        this.cartService = cartService;
        this.cartItemService = cartItemService;
        this.userService = userService;
    }

    @GetMapping("/")
    public ResponseEntity<CartDTO> findUserCartHandler() throws UserException, CartException {
        // Fetch user profile from SecurityContext
        UserDTO user = userService.findUserProfileByAuth();
        CartDTO cartDTO = cartService.findUserCart(user.getId());
        return new ResponseEntity<>(cartDTO, HttpStatus.OK);
    }

    @PutMapping("/add")
    public ResponseEntity<CartItemDTO> addItemToCart(@RequestBody AddItemRequest req) throws UserException, ProductException, CartItemException, CartException {
        // Fetch user profile from SecurityContext
        UserDTO user = userService.findUserProfileByAuth();
        CartItemDTO cartItemDTO = cartItemService.addCartItem(user.getId(), req);
        return new ResponseEntity<>(cartItemDTO, HttpStatus.ACCEPTED);
    }
}
