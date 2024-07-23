import { Course } from '../../../../domain/course';
import { CourseEntity } from '../entities/course.entity';

export class CourseMapper {
  static toDomain(raw: CourseEntity): Course {
    const domainEntity = new Course();
    domainEntity.description = raw.description;
    domainEntity.fee = raw.fee;
    domainEntity.name = raw.name;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toDomainName(raw: CourseEntity): Course {
    const domainEntity = new Course();
    domainEntity.name = raw.name;
    return domainEntity;
  }

  static toPersistence(domainEntity: Course): CourseEntity {
    const persistenceEntity = new CourseEntity();
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.fee = domainEntity.fee;
    persistenceEntity.name = domainEntity.name;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
