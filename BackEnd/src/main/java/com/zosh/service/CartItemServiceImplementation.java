package com.zosh.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zosh.dto.CartDTO;
import com.zosh.dto.CartItemDTO;
import com.zosh.dto.UserDTO;
import com.zosh.exception.CartException;
import com.zosh.exception.CartItemException;
import com.zosh.exception.UserException;
import com.zosh.mapper.CartItemMapper;
import com.zosh.mapper.CartMapper;
import com.zosh.modal.Cart;
import com.zosh.modal.CartItem;
import com.zosh.modal.Product;
import com.zosh.repository.CartItemRepository;
import com.zosh.repository.ProductRepository;
import com.zosh.request.AddItemRequest;

@Service
public class CartItemServiceImplementation implements CartItemService {

    private final CartItemRepository cartItemRepository;
    private final CartService cartService;  // Inject CartService
    private final ProductRepository productRepository;  // Inject ProductRepository
    private final UserService userService;

    @Autowired
    public CartItemServiceImplementation(CartItemRepository cartItemRepository, CartService cartService, 
                                         ProductRepository productRepository, UserService userService) {
        this.cartItemRepository = cartItemRepository;
        this.cartService = cartService;
        this.productRepository = productRepository;
        this.userService = userService;
    }

    @Override
    public CartItemDTO createCartItem(CartItemDTO cartItemDTO) {
        CartItem cartItem = CartItemMapper.toCartItemEntity(cartItemDTO);
        cartItem.setQuantity(1);
        cartItem.setPrice(cartItem.getProduct().getPrice());
        cartItem.setDiscountedPrice(cartItem.getProduct().getDiscountedPrice());

        return CartItemMapper.toCartItemDTO(cartItemRepository.save(cartItem));
    }

    @Override
    public CartItemDTO updateCartItem(Long userId, Long id, CartItemDTO cartItemDTO) throws CartItemException, UserException {
        CartItem item = findCartItem(id);
        UserDTO user = userService.findUserById(item.getUserId());

        if (user.getId().equals(userId)) {
            item.setQuantity(cartItemDTO.getQuantity());
            item.setPrice(item.getQuantity() * item.getProduct().getPrice());
            item.setDiscountedPrice(item.getQuantity() * item.getProduct().getDiscountedPrice());
            return CartItemMapper.toCartItemDTO(cartItemRepository.save(item));
        } else {
            throw new CartItemException("You can't update another user's cart item");
        }
    }

    @Override
    public CartItemDTO isCartItemExist(Cart cart, Product product, String size, Long userId) {
        CartItem item = cartItemRepository.isCartItemExist(cart, product, size, userId);
        return item != null ? CartItemMapper.toCartItemDTO(item) : null;
    }

    @Override
    public void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException {
        CartItem cartItem = findCartItem(cartItemId);
        UserDTO user = userService.findUserById(userId);

        if (user.getId().equals(cartItem.getUserId())) {
            cartItemRepository.deleteById(cartItemId);
        } else {
            throw new UserException("You can't remove another user's item");
        }
    }

    @Override
    public CartItemDTO findCartItemById(Long cartItemId) throws CartItemException {
        return CartItemMapper.toCartItemDTO(findCartItem(cartItemId));
    }

    private CartItem findCartItem(Long cartItemId) throws CartItemException {
        return cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new CartItemException("CartItem not found with id: " + cartItemId));
    }

    @Override
    public CartItemDTO addCartItem(Long userId, AddItemRequest request) throws CartItemException, UserException, CartException {
        // Fetch user's cart using CartService
        CartDTO cartDTO = cartService.findUserCart(userId); 
        Cart cart = CartMapper.toCartEntity(cartDTO);  // Convert CartDTO to Cart entity

        // Fetch product by its ID
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new CartItemException("Product not found"));

        // Create a new CartItem
        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);  // Now setting the Cart entity
        cartItem.setProduct(product);
        cartItem.setSize(request.getSize());
        cartItem.setQuantity(request.getQuantity());

        // Save the new cart item
        CartItem savedCartItem = cartItemRepository.save(cartItem);

        return CartItemMapper.toCartItemDTO(savedCartItem);  // Return the new CartItemDTO using the correct method
    }

}
