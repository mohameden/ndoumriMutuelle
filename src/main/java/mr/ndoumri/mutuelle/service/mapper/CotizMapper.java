package mr.ndoumri.mutuelle.service.mapper;

import mr.ndoumri.mutuelle.domain.*;
import mr.ndoumri.mutuelle.service.dto.CotizDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Cotiz and its DTO CotizDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, EngagementMapper.class})
public interface CotizMapper extends EntityMapper<CotizDTO, Cotiz> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "engagement.id", target = "engagementId")
    CotizDTO toDto(Cotiz cotiz);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "engagementId", target = "engagement")
    Cotiz toEntity(CotizDTO cotizDTO);

    default Cotiz fromId(Long id) {
        if (id == null) {
            return null;
        }
        Cotiz cotiz = new Cotiz();
        cotiz.setId(id);
        return cotiz;
    }
}
