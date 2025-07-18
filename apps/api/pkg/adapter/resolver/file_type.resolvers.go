package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/graph/generated"
	"project-management-demo-backend/pkg/adapter/handler"
	"project-management-demo-backend/pkg/util/datetime"
)

func (r *fileTypeResolver) CreatedAt(ctx context.Context, obj *ent.FileType) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *fileTypeResolver) UpdatedAt(ctx context.Context, obj *ent.FileType) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

func (r *mutationResolver) CreateFileType(ctx context.Context, input ent.CreateFileTypeInput) (*ent.FileType, error) {
	f, err := r.controller.FileType.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return f, nil
}

func (r *mutationResolver) UpdateFileType(ctx context.Context, input ent.UpdateFileTypeInput) (*ent.FileType, error) {
	f, err := r.controller.FileType.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return f, nil
}

func (r *queryResolver) FileType(ctx context.Context, where *ent.FileTypeWhereInput) (*ent.FileType, error) {
	f, err := r.controller.FileType.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return f, nil
}

func (r *queryResolver) FileTypes(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.FileTypeWhereInput) (*ent.FileTypeConnection, error) {
	fs, err := r.controller.FileType.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return fs, nil
}

// FileType returns generated.FileTypeResolver implementation.
func (r *Resolver) FileType() generated.FileTypeResolver { return &fileTypeResolver{r} }

type fileTypeResolver struct{ *Resolver }
