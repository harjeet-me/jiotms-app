package com.jiotms.myapp.repository.search;
import com.jiotms.myapp.domain.Container;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Container} entity.
 */
public interface ContainerSearchRepository extends ElasticsearchRepository<Container, Long> {
}
