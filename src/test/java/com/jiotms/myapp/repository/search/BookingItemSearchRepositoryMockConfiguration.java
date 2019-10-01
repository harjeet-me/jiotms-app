package com.jiotms.myapp.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link BookingItemSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class BookingItemSearchRepositoryMockConfiguration {

    @MockBean
    private BookingItemSearchRepository mockBookingItemSearchRepository;

}
