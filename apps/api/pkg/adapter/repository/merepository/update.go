package merepository

import (
	"context"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *meRepository) Update(ctx context.Context, input model.UpdateMeInput) (*model.Me, error) {
	teammateInput := model.UpdateTeammateInput{
		ID:    input.ID,
		Name:  input.Name,
		Email: input.Email,
	}

	t, err := r.client.
		Teammate.UpdateOneID(input.ID).
		SetInput(teammateInput).
		Save(ctx)

	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, input.ID)
		}

		return nil, model.NewDBError(err)
	}

	return &model.Me{
		ID:        t.ID,
		Name:      t.Name,
		Image:     t.Image,
		Email:     t.Email,
		CreatedAt: t.CreatedAt,
		UpdatedAt: t.UpdatedAt,
	}, nil
}
