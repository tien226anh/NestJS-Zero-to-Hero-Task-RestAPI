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

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return await this.tasksService.getAllTasks();
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Task> {
    return await this.tasksService.getTasksById(id);
  }

  @Post()
  @ApiBody({ type: Task })
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  @ApiQuery({ name: 'status', enum: TaskStatus })
  async updateStatus(
    @Param('id') id: string,
    @Query('status') status: TaskStatus = TaskStatus.OPEN,
  ): Promise<Task> {
    return this.tasksService.updateStatus(id, status);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    return await this.tasksService.deleteTask(id);
  }
}
