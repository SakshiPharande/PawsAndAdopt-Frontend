import React from 'react';
import { Bird, Dog, Fish, Cat, LucideIcon } from "lucide-react";

interface CategoryProps {
  name: string;
  icon: LucideIcon;
  href: string;
}

const CategoryItem: React.FC<CategoryProps> = ({ name, icon: Icon, href }) => {
  return (
    <a 
      href={href} 
      className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md transition-transform hover:scale-105 hover:shadow-lg"
    >
      <div className="p-4 mb-4 bg-amber-100 rounded-full">
        <Icon size={32} className="text-amber-600" />
      </div>
      <h5 className="text-lg font-medium text-gray-800">{name}</h5>
    </a>
  );
};

const PetCategories: React.FC = () => {
  const categories: CategoryProps[] = [
    { name: "Bird Shop", icon: Bird, href: "#bird" },
    { name: "Dog Shop", icon: Dog, href: "#dog" },
    { name: "Fish Shop", icon: Fish, href: "#fish" },
    { name: "Cat Shop", icon: Cat, href: "#cat" }
  ];

  return (
    <section id="categories" className="py-12 bg-amber-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Pet Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryItem 
              key={index} 
              name={category.name} 
              icon={category.icon} 
              href={category.href} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PetCategories;