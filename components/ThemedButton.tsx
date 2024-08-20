import { Button, type ButtonProps } from 'react-native';

export type ThemedButtonProps = ButtonProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedButton({
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedButtonProps) {

  return (
    <Button
      {...rest}
    />
  );
}
