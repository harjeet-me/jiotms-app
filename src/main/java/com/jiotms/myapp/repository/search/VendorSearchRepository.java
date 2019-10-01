package com.jiotms.myapp.repository.search;
import com.jiotms.myapp.domain.Vendor;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Vendor} entity.
 */
public interface VendorSearchRepository extends ElasticsearchRepository<Vendor, Long> {
}
