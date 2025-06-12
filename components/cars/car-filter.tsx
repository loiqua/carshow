"use client";

import { useState, useCallback } from "react";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

export interface FilterValues {
  brand: string;
  model: string;
  minPrice: string;
  maxPrice: string;
  motorType: string;
  color: string;
  type: string;
}

interface CarFilterProps {
  readonly onFilter: (values: FilterValues) => void;
}

export function CarFilter({ onFilter }: CarFilterProps) {
  const [filterValues, setFilterValues] = useState<FilterValues>({
    brand: "all_brands",
    model: "",
    minPrice: "",
    maxPrice: "",
    motorType: "all_motor_types",
    color: "all_colors",
    type: "all_vehicle_types",
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFilterValues((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSelectChange = useCallback(
    (name: string, value: string) => {
      setFilterValues((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onFilter(filterValues);
    },
    [filterValues, onFilter]
  );

  const handleReset = useCallback(() => {
    setFilterValues({
      brand: "all_brands",
      model: "",
      minPrice: "",
      maxPrice: "",
      motorType: "all_motor_types",
      color: "all_colors",
      type: "all_vehicle_types",
    });
    onFilter({
      brand: "all_brands",
      model: "",
      minPrice: "",
      maxPrice: "",
      motorType: "all_motor_types",
      color: "all_colors",
      type: "all_vehicle_types",
    });
  }, [onFilter]);

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4">Filtrer les véhicules</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Marque */}
        <div className="space-y-2">
          <Label htmlFor="brand">Marque</Label>
          <Select 
            value={filterValues.brand} 
            onValueChange={(value: string) => handleSelectChange("brand", value)}
          >
            <SelectTrigger id="brand">
              <SelectValue placeholder="Toutes les marques" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_brands">Toutes les marques</SelectItem>
              <SelectItem value="Mercedes-Benz">Mercedes-Benz</SelectItem>
              <SelectItem value="BMW">BMW</SelectItem>
              <SelectItem value="Audi">Audi</SelectItem>
              <SelectItem value="Porsche">Porsche</SelectItem>
              <SelectItem value="Ferrari">Ferrari</SelectItem>
              <SelectItem value="Lamborghini">Lamborghini</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Modèle */}
        <div className="space-y-2">
          <Label htmlFor="model">Modèle</Label>
          <Input
            id="model"
            name="model"
            placeholder="Tous les modèles"
            value={filterValues.model}
            onChange={handleInputChange}
          />
        </div>

        {/* Fourchette de prix */}
        <div className="space-y-2">
          <Label>Fourchette de prix (€)</Label>
          <div className="flex space-x-2">
            <Input
              id="minPrice"
              name="minPrice"
              type="number"
              placeholder="Min"
              value={filterValues.minPrice}
              onChange={handleInputChange}
              className="w-1/2"
            />
            <Input
              id="maxPrice"
              name="maxPrice"
              type="number"
              placeholder="Max"
              value={filterValues.maxPrice}
              onChange={handleInputChange}
              className="w-1/2"
            />
          </div>
        </div>

        {/* Type de moteur */}
        <div className="space-y-2">
          <Label htmlFor="motorType">Type de moteur</Label>
          <Select 
            value={filterValues.motorType} 
            onValueChange={(value: string) => handleSelectChange("motorType", value)}
          >
            <SelectTrigger id="motorType">
              <SelectValue placeholder="Tous les types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_motor_types">Tous les types</SelectItem>
              <SelectItem value="Essence">Essence</SelectItem>
              <SelectItem value="Diesel">Diesel</SelectItem>
              <SelectItem value="Électrique">Électrique</SelectItem>
              <SelectItem value="Hybride">Hybride</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Couleur */}
        <div className="space-y-2">
          <Label htmlFor="color">Couleur</Label>
          <Select 
            value={filterValues.color} 
            onValueChange={(value: string) => handleSelectChange("color", value)}
          >
            <SelectTrigger id="color">
              <SelectValue placeholder="Toutes les couleurs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_colors">Toutes les couleurs</SelectItem>
              <SelectItem value="Noir">Noir</SelectItem>
              <SelectItem value="Blanc">Blanc</SelectItem>
              <SelectItem value="Gris">Gris</SelectItem>
              <SelectItem value="Bleu">Bleu</SelectItem>
              <SelectItem value="Rouge">Rouge</SelectItem>
              <SelectItem value="Vert">Vert</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Type de véhicule */}
        <div className="space-y-2">
          <Label htmlFor="type">Type de véhicule</Label>
          <Select 
            value={filterValues.type} 
            onValueChange={(value: string) => handleSelectChange("type", value)}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Tous les types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_vehicle_types">Tous les types</SelectItem>
              <SelectItem value="Berline">Berline</SelectItem>
              <SelectItem value="SUV">SUV</SelectItem>
              <SelectItem value="Coupé">Coupé</SelectItem>
              <SelectItem value="Cabriolet">Cabriolet</SelectItem>
              <SelectItem value="Break">Break</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
        >
          Réinitialiser
        </Button>
        <Button type="submit">
          Appliquer les filtres
        </Button>
      </div>
    </form>
  );
}