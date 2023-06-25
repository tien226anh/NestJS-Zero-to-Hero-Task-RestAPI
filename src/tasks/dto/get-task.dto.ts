import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../tasks.model';

export class GetTasksFilterDto {
  @ApiProperty({ required: false })
  search?: string;
  @ApiProperty({
    required: false,
    enum: [...Object.values(TaskStatus)],
    enumName: 'TaskStatus',
  })
  status?: TaskStatus;
}
