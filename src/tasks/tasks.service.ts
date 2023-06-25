import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public async getAllTasks(): Promise<Task[]> {
    return this.tasks;
  }

  public async getTasksById(id: string): Promise<Task> {
    return this.tasks.find((task) => task.id === id);
  }

  public async getTaskByFilter(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    let tasks = await this.getAllTasks();

    if (status !== 'EMPTY') {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      const lowercaseSearch = search.toLowerCase();
      tasks = tasks.filter((task) => {
        const lowercaseTitle = task.title.toLowerCase();
        const lowercaseDescription = task.description.toLowerCase();

        return (
          lowercaseTitle.includes(lowercaseSearch) ||
          lowercaseDescription.includes(lowercaseSearch)
        );
      });
    }

    return tasks;
  }

  public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  public async updateStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = this.getTasksById(id);
    (await task).status = status;
    return task;
  }

  public async deleteTask(id: string): Promise<void> {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
