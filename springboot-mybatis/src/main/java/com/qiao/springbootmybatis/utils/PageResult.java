package com.qiao.springbootmybatis.utils;

import java.util.List;

public class PageResult<T> {
    private Long count;
    private List<T> results;

    public PageResult(Long count, List<T> results) {
        this.count = count;
        this.results = results;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public List<T> getResults() {
        return results;
    }

    public void setResults(List<T> results) {
        this.results = results;
    }
}
