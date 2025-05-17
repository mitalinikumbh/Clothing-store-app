package com.zosh.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.zosh.dto.UserDTO;
import com.zosh.exception.ProductException;
import com.zosh.modal.Product;
import com.zosh.modal.Review;
import com.zosh.modal.User;
import com.zosh.repository.ProductRepository;
import com.zosh.repository.ReviewRepository;
import com.zosh.request.ReviewRequest;
import com.zosh.mapper.UserMapper;  // Make sure this mapper exists to handle conversion

@Service
public class ReviewServiceImplementation implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductService productService;
    private final ProductRepository productRepository;

    public ReviewServiceImplementation(ReviewRepository reviewRepository, ProductService productService, ProductRepository productRepository) {
        this.reviewRepository = reviewRepository;
        this.productService = productService;
        this.productRepository = productRepository;
    }

    @Override
    public Review createReview(ReviewRequest req, UserDTO userDTO) throws ProductException {
        // Convert UserDTO to User
        User user = UserMapper.toEntity(userDTO);  // Assuming you have a UserMapper to handle this conversion
        
        // Fetch the product
        Product product = productService.findProductById(req.getProductId());
        
        // Create a new review
        Review review = new Review();
        review.setUser(user);
        review.setProduct(product);
        review.setReview(req.getReview());
        review.setCreatedAt(LocalDateTime.now());
        
        // Save the review and the product
        productRepository.save(product);
        return reviewRepository.save(review);  // Save and return the Review entity
    }

    @Override
    public List<Review> getAllReview(Long productId) {
        return reviewRepository.getAllProductsReview(productId);
    }
}
