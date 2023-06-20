package services;

import repositories.BuildingRepository;

public class BuildingService {
    @AutoWired
    private BuildingRepository repository;

    public entities.Building saveBuilding(entities.Building building) {
        return repository.save(building);
    }

    public List<entities.Building> saveBuildings(List<entities.Building> buildingList) {
        return repository.saveAll(buildingList);
    }

    public List<entities.Building> getBuildings() {
        return repository.findAll();
    }

    public String deleteBuilding(long id) {
        repository.deleteById(id);
        return "building removed with id " + id;
    }

    public entities.Building updateBuilding(entities.Building building) {
        entities.Building existingBuilding = repository.findById(building.getId());
        existingBuilding.setAddress(building.getAddress());
        existingBuilding.setOwner(building.getOwner());
        return existingBuilding;
    }

}