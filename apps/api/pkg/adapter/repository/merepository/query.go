package merepository

import (
	"context"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/ent/teammate"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *meRepository) Get(ctx context.Context, id model.ID) (*model.Me, error) {
	q := r.client.Teammate.Query()

	if id == "" {
		return nil, model.NewInvalidParamError(map[string]interface{}{
			"id": id,
		})
	}
	q.Where(teammate.IDEQ(id))

	me, err := q.Only(ctx)

	if err != nil {
		if ent.IsNotSingular(err) {
			return nil, model.NewNotFoundError(err, map[string]interface{}{
				"id": id,
			})
		}
		if ent.IsNotFound(err) {
			return nil, nil
		}
		return nil, model.NewDBError(err)
	}

	return &model.Me{
		ID:        me.ID,
		Name:      me.Name,
		Image:     me.Image,
		Email:     me.Email,
		CreatedAt: me.CreatedAt,
		UpdatedAt: me.UpdatedAt,
	}, nil
}
