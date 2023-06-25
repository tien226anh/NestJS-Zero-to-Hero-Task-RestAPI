import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { ApiTags, ApiBody, ApiQuery } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @ApiQuery({
    name: 'status',
    enum: [...Object.values(TaskStatus)],
  })
  async getAllTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    if (Object.keys(filterDto).length) {
      return await this.tasksService.getTaskByFilter(filterDto);
    } else {
      return await this.tasksService.getAllTasks();
    }
  }

  @Post()
  @ApiBody({ type: CreateTaskDto })
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksService.createTask(createTaskDto);
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Task> {
    return await this.tasksService.getTasksById(id);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    return await this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  @ApiQuery({ name: 'status', enum: TaskStatus })
  async updateStatus(
    @Param('id') id: string,
    @Query('status') status: TaskStatus = TaskStatus.OPEN,
  ): Promise<Task> {
    return this.tasksService.updateStatus(id, status);
  }
}
