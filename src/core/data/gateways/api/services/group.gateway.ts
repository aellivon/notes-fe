import {
    IListGroupModel
} from '../api.types'
import { PagedGroupBaseEntity, IBaseGroupProfile } from '../../../../domain/entities/groups/group-base.entity'
import { Api } from '../../../infra/api'
import { setGroupAttributes } from './mappers/group.mappers'
import { setPagedDataBaseAttributes } from './mappers/page.mapper'


interface Params {
    pageNumber?: number
}


export interface IGroupGateway {
    listGroups: ({pageNumber = 1}: Params) => Promise<IListGroupModel>
    mapGroupEntity: (response: IListGroupModel) => PagedGroupBaseEntity
}

export default class GroupApiGateway extends Api implements IGroupGateway {
    async listGroups ({pageNumber = 1}: Params): Promise<IListGroupModel> {
        let params = {
            page: pageNumber
        }
        return this.get<IListGroupModel>('/user/group', {...params})
    }

    mapGroupEntity (model: IListGroupModel) {
        
        let results: IBaseGroupProfile[] = []

        let data = setPagedDataBaseAttributes(model)
        setGroupAttributes(model)

        model.results.forEach(element => {
            const group: IBaseGroupProfile = setGroupAttributes(element)
            results.push(group)
        });


        let pagedGroups = new PagedGroupBaseEntity()
        pagedGroups.setEntity(
            {
                ...data,
                results: results
            }
        )
    
        return pagedGroups
    }
}
