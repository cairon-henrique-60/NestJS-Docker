import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CrateTablaUsersAndCourses1677144156865 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users_courses',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'coursesId',
                    type: 'uuid',
                    isNullable: true,                      
                },
                {
                    name: 'usersId',
                    type: 'uuid',
                    isNullable: true,                      
                },
            ]
        }));

        await queryRunner.createForeignKeys(
            'users_courses', [
                new TableForeignKey({
                    name: 'coursesAndUsers',
                    columnNames: ['coursesId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'courses',
                }),
                 new TableForeignKey({
                    name: 'usesrAndCourses',
                    columnNames: ['usersId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'users',
                }),
            ]
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users_courses', 'coursesAndUsers');
        await queryRunner.dropForeignKey('users_courses', 'usesrAndCourses');
        await queryRunner.dropTable('users_courses');
    }

}
