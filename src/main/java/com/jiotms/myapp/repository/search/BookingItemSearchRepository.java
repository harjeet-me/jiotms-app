package com.jiotms.myapp.repository.search;
import com.jiotms.myapp.domain.BookingItem;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link BookingItem} entity.
 */
public interface BookingItemSearchRepository extends ElasticsearchRepository<BookingItem, Long> {
}
