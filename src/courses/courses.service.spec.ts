import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { CourseRepository } from './infrastructure/persistence/course.repository';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseEntity } from './infrastructure/persistence/relational/entities/course.entity';

describe('CoursesService', () => {
  let service: CoursesService;
  let repository: CourseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: CourseRepository,
          useValue: {
            create: jest.fn(),
            findAllWithPagination: jest.fn(),
            findAllNamesWithPagination: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    repository = module.get<CourseRepository>(CourseRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a course', async () => {
      const createCourseDto: CreateCourseDto = {
        name: 'db 101',
        fee: 5000,
        description: 'some desc',
      };

      const expectedResult: Partial<CourseEntity> = {
        id: '1',
        name: 'db 101',
        fee: 5000,
        description: 'some desc',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(repository, 'create')
        .mockResolvedValue(expectedResult as CourseEntity);

      const result = await service.create(createCourseDto);

      expect(result).toBe(expectedResult);

      expect(repository.create).toHaveBeenCalledWith(createCourseDto);
    });
  });
});
