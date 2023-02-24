import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class TagsNCourses1676432740112 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.addColumn(
            'courses_tags',
            new TableColumn({
                name: 'tagsId',
                type: 'int',
                isNullable: true,
                isGenerated: true,
                generationStrategy: 'increment',
            })
        );

        await queryRunner.createForeignKey(
            'courses_tags', 
            new TableForeignKey({
                name: 'couses_tags_tags',
                columnNames: ['tagsId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'tags',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('courses_tags', 'couses_tags_tags');

        await  queryRunner.dropColumn('courses_tags', 'tagsId')
    }

}
