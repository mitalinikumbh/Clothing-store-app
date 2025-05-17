package com.zosh.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.zosh.dto.UserDTO;
import com.zosh.exception.ProductException;
import com.zosh.modal.Product;
import com.zosh.modal.Rating;
import com.zosh.modal.User;
import com.zosh.repository.RatingRepository;
import com.zosh.request.RatingRequest;
import com.zosh.mapper.UserMapper;  // Ensure you have a UserMapper to handle the conversion

@Service
public class RatingServiceImplementation implements RatingServices {
    
    private final RatingRepository ratingRepository;
    private final ProductService productService;

    public RatingServiceImplementation(RatingRepository ratingRepository, ProductService productService) {
        this.ratingRepository = ratingRepository;
        this.productService = productService;
    }

    @Override
    public Rating createRating(RatingRequest req, UserDTO userDTO) throws ProductException {
        
        // Convert UserDTO to User
        User user = UserMapper.toEntity(userDTO);  // Assuming UserMapper is available to convert UserDTO to User
        
        // Fetch the product
        Product product = productService.findProductById(req.getProductId());
        
        // Create a new rating
        Rating rating = new Rating();
        rating.setProduct(product);
        rating.setUser(user);
        rating.setRating(req.getRating());
        rating.setCreatedAt(LocalDateTime.now());
        
        return ratingRepository.save(rating);  // Save the rating and return
    }

    @Override
    public List<Rating> getProductsRating(Long productId) {
        return ratingRepository.getAllProductsRating(productId);
    }
}
