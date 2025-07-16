import type { EditorProps } from 'prosemirror-view';
import type React from 'react';
import { type PropsWithChildren, memo, useMemo } from 'react';
import { plugins, schema } from 'src/shared/prosemirror/config';
import { EditorContainer } from './Editors';

type Props = PropsWithChildren<
  {
    initialValue: string;
    forceUpdate?: number;
    onChange?: (val: string) => void;
    resetView?: number;
  } & EditorProps
>;

export const Editor: React.FC<Props> = memo<Props>((props) => {
  const pluginsProp = useMemo(() => plugins(), []);

  return (
    <EditorContainer
      onChange={props.onChange}
      {...props}
      debounce={500}
      schema={schema}
      plugins={pluginsProp}
      initialValue={props.initialValue}
    >
      {props.children}
    </EditorContainer>
  );
});
Editor.displayName = 'Editor';
