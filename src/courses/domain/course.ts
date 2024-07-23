import { ApiProperty } from '@nestjs/swagger';

export class Course {
  @ApiProperty()
  description: string;

  @ApiProperty()
  fee: number;

  @ApiProperty()
  name: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
