package com.lizi.customer.controller;

import com.lizi.customer.dto.response.ResponseObject;
import com.lizi.customer.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping(value ="/api/v1/review")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @RequestMapping(value = "/{productSlug}", method = RequestMethod.GET)
    public ResponseObject getAllReview(@PathVariable(name = "productSlug") String productSlug) {
        return new ResponseObject<>(HttpStatus.OK, "Thành công", reviewService.getReviewsByProductSlug(productSlug));
    }

//    @PostMapping("/{productSlug}")
//    public ResponseObject addOrder(@PathVariable(name = "productSlug") String productSlug,
//                                   @Valid @RequestBody ReviewRequestDTO reviewRequestDTO, HttpServletRequest request) {
//        return new ResponseObject<>(HttpStatus.OK, "Thành công", reviewService.addReview(productSlug, reviewRequestDTO);
//    }

}
