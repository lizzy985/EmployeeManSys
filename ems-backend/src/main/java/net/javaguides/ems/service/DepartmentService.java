package net.javaguides.ems.service;

import net.javaguides.ems.dto.DepartmentDto;

import java.util.List;

public interface DepartmentService {
    DepartmentDto createDepartmentDto(DepartmentDto departmentDto);
    DepartmentDto getDepartmentDtoById(Long departmentId);

    List<DepartmentDto> getAllDepartment();

    DepartmentDto updateDepartment(Long departmentId, DepartmentDto updatedDepart);

    void deleteDepartment(Long departmentId);
}
