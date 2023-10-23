package server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TaskCountDto {
    private Long taskCount;
    private String departmentName;
    private String taskStatus;
}
