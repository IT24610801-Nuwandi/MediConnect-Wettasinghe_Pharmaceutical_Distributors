package com.example.mediconnectwettasinghe_pharmaceutical_distributors.controller;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.dto.ProductDTO;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.entity.Product;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.entity.ProductImage;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.repo.ProductImageRepo;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.repo.ProductRepo;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepo productRepo;
    private final ProductImageRepo imageRepo;

//images will be updated to a specific folder
private static final Path UPLOAD_DIR = Paths.get(
        System.getProperty("user.home"), "Desktop","Admin", "uploads"
).toAbsolutePath().normalize();
    private static final Set<String> ALLOWED = Set.of(
            MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE, "image/webp", "image/gif"
    );
    private static final int MAX_PER_PRODUCT = 6;

    public ProductController(ProductRepo productRepo, ProductImageRepo imageRepo) {
        this.productRepo = productRepo;
        this.imageRepo = imageRepo;
    }

    //Products CRUD
    @GetMapping
    public List<ProductDTO> list() {
        return productRepo.findAll().stream().map(ProductDTO::from).toList();
    }

    @GetMapping("/{id}")
    public ProductDTO one(@PathVariable Integer id) {
        Product p = productRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Product not found"));
        return ProductDTO.from(p);
    }

    @PostMapping
    public Product create(@RequestBody Product p) {
        return productRepo.save(p);
    }

    @PutMapping("/{id}")
    public Product update(@PathVariable Integer id, @RequestBody Product incoming) {
        Product db = productRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Product not found"));
        db.setItemCode(incoming.getItemCode());
        db.setItemName(incoming.getItemName());
        db.setBrand(incoming.getBrand());
        db.setAgency(incoming.getAgency());
        db.setCategory(incoming.getCategory());
        db.setStrength(incoming.getStrength());
        db.setSize(incoming.getSize());
        db.setMarketName(incoming.getMarketName());
        db.setPriceRetail(incoming.getPriceRetail());
        db.setQtyRetail(incoming.getQtyRetail());
        db.setPriceWholesale(incoming.getPriceWholesale());
        db.setQtyWholesale(incoming.getQtyWholesale());
        db.setPurchaseUnit(incoming.getPurchaseUnit());
        db.setSellingUnit(incoming.getSellingUnit());
        db.setIsNew(incoming.getIsNew());
        db.setIsActive(incoming.getIsActive());
        return productRepo.save(db);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        productRepo.deleteById(id);
    }

    // Product Images

    // Return minimal objects
    @GetMapping("/{id}/images")
    public List<ImageRow> listImages(@PathVariable Integer id) {
        ensureProduct(id);
        return imageRepo.findByProduct_ItemIdOrderBySortOrderAsc(id).stream()
                .map(pi -> new ImageRow(pi.getImageId(), pi.getImageUrl(), pi.getSortOrder()))
                .toList();
    }

    public record ImageRow(Integer imageId, String imageUrl, Integer sortOrder) {}

    @PostMapping(value = "/{id}/images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ProductImage upload(@PathVariable Integer id,
                               @RequestParam("file") MultipartFile file,
                               @RequestParam(value = "sortOrder", defaultValue = "1") Integer sortOrder) {
        Product product = ensureProduct(id);

        long current = imageRepo.countByProduct_ItemId(id);
        if (current >= MAX_PER_PRODUCT) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Maximum " + MAX_PER_PRODUCT + " images allowed");
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED.contains(contentType)) {
            throw new ResponseStatusException(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "Unsupported image type");
        }

        try {
            Files.createDirectories(UPLOAD_DIR);
            String original = file.getOriginalFilename() == null ? "img" : file.getOriginalFilename();
            original = original.replaceAll("\\s+", "_");
            String filename = System.currentTimeMillis() + "_" + original;
            Path target = UPLOAD_DIR.resolve(filename).normalize();

            try {
                file.transferTo(target);
            } catch (NoSuchMethodError ignore) {
                try (InputStream in = file.getInputStream()) { Files.copy(in, target); }
            }

            ProductImage img = new ProductImage();
            img.setProduct(product);
            img.setImageUrl(filename);
            img.setSortOrder(sortOrder == null ? 1 : sortOrder);
            return imageRepo.save(img);

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save file", e);
        }
    }

    @PostMapping(value = "/{id}/images/batch", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public List<ProductImage> uploadBatch(@PathVariable Integer id,
                                          @RequestParam("files") List<MultipartFile> files) {
        ensureProduct(id);
        long current = imageRepo.countByProduct_ItemId(id);
        if (current + files.size() > MAX_PER_PRODUCT) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Max " + MAX_PER_PRODUCT + " images per product");
        }
        AtomicInteger nextOrder = new AtomicInteger((int) (current + 1));
        return files.stream().map(f -> upload(id, f, nextOrder.getAndIncrement())).toList();
    }

    @DeleteMapping("/{productId}/images/{imageId}")
    public ResponseEntity<Void> deleteImage(@PathVariable Integer productId, @PathVariable Integer imageId) {
        ProductImage img = imageRepo.findByImageIdAndProduct_ItemId(imageId, productId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Image not found"));
        try {
            Files.deleteIfExists(UPLOAD_DIR.resolve(img.getImageUrl()).normalize());
        } catch (Exception ignored) {}
        imageRepo.delete(img);
        return ResponseEntity.noContent().build();
    }

    // Serve files at /api/v1/products/uploads/{filename}
    @GetMapping("/uploads/{filename}")
    public ResponseEntity<FileSystemResource> serve(@PathVariable String filename) {
        File f = UPLOAD_DIR.resolve(filename).toFile();
        if (!f.exists()) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(new FileSystemResource(f));
    }

    private Product ensureProduct(Integer id) {
        return productRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Product not found"));
    }
}

