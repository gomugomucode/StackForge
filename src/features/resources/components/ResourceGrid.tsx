"use client";

import React, { useState, useEffect } from 'react';
import { resourceService } from '../services/resourceService';
import { ResourceCard } from './ResourceCard';
import { ResourceFilter, Resource } from '../types/resource';
import { Search, Filter as FilterIcon } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function ResourceGrid() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<ResourceFilter>({
    search: '',
    type: undefined,
    technology: undefined,
    difficulty: undefined,
  });

  useEffect(() => {
    async function loadResources() {
      setIsLoading(true);
      const data = await resourceService.getResources(filters);
      setResources(data);
      setIsLoading(false);
    }
    loadResources();
  }, [filters]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            className="pl-10"
            placeholder="Search resources..." 
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
          <Button 
            variant={!filters.type ? "primary" : "outline"} 
            size="sm" 
            onClick={() => setFilters({ ...filters, type: undefined })}
          >
            All
          </Button>
          {(['DOCS', 'VIDEO', 'BOOK', 'PRACTICE'] as ResourceType[]).map(type => (
            <Button 
              key={type}
              variant={filters.type === type ? "primary" : "outline"} 
              size="sm" 
              onClick={() => setFilters({ ...filters, type })}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 animate-pulse bg-card rounded-2xl border border-border" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map(res => (
            <ResourceCard key={res.id} resource={res} />
          ))}
          {resources.length === 0 && (
            <div className="col-span-full py-20 text-center space-y-4">
              <p className="text-muted-foreground">No resources found matching your filters.</p>
              <Button variant="outline" onClick={() => setFilters({ search: '', type: undefined, technology: undefined, difficulty: undefined })}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

type ResourceType = 'DOCS' | 'VIDEO' | 'BOOK' | 'PRACTICE';
