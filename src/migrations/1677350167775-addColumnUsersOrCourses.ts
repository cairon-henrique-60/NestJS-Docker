import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class addColumnUsersOrCourses1677350167775 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users_courses',
            new TableColumn({
                name: 'coursesId',
                type: 'int',
                isNullable: true,
                isGenerated: true,
                generationStrategy: 'increment',
            }),
        );

        await queryRunner.createForeignKey(
            'courses_tags', 
            new TableForeignKey({
                name: 'couses_users_courses',
                columnNames: ['coursesId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'courses',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('courses_tags', 'couses_tags_courses');

        await  queryRunner.dropColumn('courses_tags', 'coursesId');
    }

}   
