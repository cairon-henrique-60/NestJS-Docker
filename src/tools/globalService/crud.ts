import { HttpException, NotFoundException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { DeepPartial, FindManyOptions, Repository } from "typeorm";

@Injectable()
export abstract class GeneralService<T> {
    protected readonly defaultRelations: string[] = [];
    protected constructor(protected readonly repository: Repository<T>) {}

    findAll(relations: FindManyOptions<T>) {
        const mergedRelations = {
            ...relations,
            relations: [
                ...this.defaultRelations, 
                ...(relations.relations || [])
            ],
        };
        return this.repository.find(mergedRelations);
    }

    findOne(id: string | number, relations: FindManyOptions<T>) {
        const mergedRelations = {
            ...relations,
            relations: [
                ...this.defaultRelations, 
                ...(relations.relations || [])
            ],
        };
        const user = this.repository.findOne(id, mergedRelations);

        if (!user) {
            throw new NotFoundException(`User ${id} not found!`);
        };

        return user;
    }

    async create(props: any) {
        const entity = await this.repository.findOne( props.name );

        if (!entity) {
            throw new NotFoundException(`${props.name} is not found!`);
        };
        const propsCreated = this.repository.create({
            ...props
        });
        const objectCreated: DeepPartial<any> = {
            ...propsCreated
        };
        return this.repository.save(objectCreated);
    }

    async update(id: string, props: any) {
        const entity = await this.repository.findOne( props.name );

        if (!entity) {
            throw new NotFoundException(`${props.name} is not found!`);
        }
        const propsPreload = this.repository.preload({
            id: +id,
            ...props, 
            entity,
        })
        if (!propsPreload) {
            throw new NotFoundException(`ID ${props.id} is not found!`);
        }
        const objectCreated: DeepPartial<any> = {
            ...propsPreload
        };
        return this.repository.save(objectCreated);

    }

    async deleteProps(id: string | number) {
        const entityId = await this.repository.findOne(id);

        if (entityId) {
            throw new NotFoundException(`ID ${id} is not found!`);
        }

        return this.repository.remove(entityId)
    }
}