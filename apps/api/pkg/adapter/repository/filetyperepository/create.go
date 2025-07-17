package filetyperepository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *fileTypeRepository) Create(ctx context.Context, input model.CreateFileTypeInput) (*model.FileType, error) {
	res, err := r.client.
		FileType.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
