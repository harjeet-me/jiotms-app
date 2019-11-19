package com.jiotms.myapp.repository.search;
import com.jiotms.myapp.domain.LoadOrder;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link LoadOrder} entity.
 */
public interface LoadOrderSearchRepository extends ElasticsearchRepository<LoadOrder, Long> {
}
