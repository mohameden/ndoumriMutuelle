package mr.ndoumri.mutuelle.service.mapper;

import mr.ndoumri.mutuelle.domain.*;
import mr.ndoumri.mutuelle.service.dto.EngagementDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Engagement and its DTO EngagementDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface EngagementMapper extends EntityMapper<EngagementDTO, Engagement> {

    @Mapping(source = "owner.id", target = "ownerId")
    EngagementDTO toDto(Engagement engagement);

    @Mapping(target = "cotizs", ignore = true)
    @Mapping(source = "ownerId", target = "owner")
    Engagement toEntity(EngagementDTO engagementDTO);

    default Engagement fromId(Long id) {
        if (id == null) {
            return null;
        }
        Engagement engagement = new Engagement();
        engagement.setId(id);
        return engagement;
    }
}
