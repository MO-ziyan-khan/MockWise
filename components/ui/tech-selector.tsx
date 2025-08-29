'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { X, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface TechSelectorProps {
  technologies?: string[];
  availableTechnologies?: string[];
  selectedTechnologies: string[];
  onChange: (technologies: string[]) => void;
  className?: string;
}

const TechSelector = ({
  technologies,
  availableTechnologies,
  selectedTechnologies,
  onChange,
  className,
}: TechSelectorProps) => {
  // Use availableTechnologies if provided, otherwise fall back to technologies
  const techOptions = availableTechnologies || technologies || [];
  const [searchTerm, setSearchTerm] = useState('');

  const handleToggle = (tech: string) => {
    if (selectedTechnologies.includes(tech)) {
      onChange(selectedTechnologies.filter((t) => t !== tech));
    } else {
      onChange([...selectedTechnologies, tech]);
    }
  };

  const handleRemove = (tech: string, e: React.MouseEvent) => {
    // Prevent default behavior and stop propagation
    e.preventDefault();
    e.stopPropagation();
    
    // Create a new array without the removed technology
    const updatedTechnologies = selectedTechnologies.filter((t) => t !== tech);
    
    // Call the onChange handler with the updated array
    onChange(updatedTechnologies);
  };

  const filteredTechnologies = techOptions.filter((tech) =>
    tech.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={cn('space-y-2', className)}>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search technologies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>

      {selectedTechnologies.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {selectedTechnologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs py-1 px-2 flex items-center gap-1">
              <span>{tech}</span>
              <button 
                type="button"
                className="flex items-center justify-center rounded-full hover:bg-gray-300 p-0.5 cursor-pointer"
                onClick={(e) => handleRemove(tech, e)}
                aria-label={`Remove ${tech}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded-md p-2">
        {filteredTechnologies.map((tech) => (
          <div
            key={tech}
            onClick={() => handleToggle(tech)}
            className={`cursor-pointer rounded px-2 py-1 text-xs transition-colors ${
              selectedTechnologies.includes(tech)
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            {tech}
          </div>
        ))}
        {filteredTechnologies.length === 0 && (
          <div className="col-span-2 text-center py-2 text-sm text-muted-foreground">
            No technologies found
          </div>
        )}
      </div>
    </div>
  );
};

export default TechSelector;