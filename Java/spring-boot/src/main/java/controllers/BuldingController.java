package controllers;

import services.BuildingService;

@RestController
public class BuldingController {
    @Autowired
    private BuildingService service;

    @PostMapping("api/addBuilding")
    public entities.Building addBuilding(@RequestBody entities.Building building) {
        return service.saveBuilding(building);
    }

    @PostMapping("api/addBuldings")
    public List<entities.Building> addBuldings(@RequestBody List<entities.Building> buildingList) {
        return service.saveBuildings(buildingList);
    }

    @GetMapping("/api/buildings")
    public List<entities.Building> getBuildings() {
        return service.getBuildings();
    }

    @PutMapping("/api/updateBuilding")
    public entities.Building updateBuilding(@RequestBody entities.Building building) {
        return service.updateBuilding(building);
    }

    @DeleteMapping("/api/deleteBuilding/{id}")
    public String deleteBuilding(@PathVariable long id) {
        return service.deleteBuilding(id);
    }
}
