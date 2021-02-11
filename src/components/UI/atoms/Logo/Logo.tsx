import React from 'react'
import { createIcon, IconProps, theme } from '@chakra-ui/react'

const LogoIcon = createIcon({
  viewBox: '0 0 109 25',
  path: (
    <>
      <path
        d="M12 3C8.13 3 5 6.13 5 10C5 15.25 12 23 12 23C12 23 19 15.25 19 10C19 6.13 15.87 3 12 3ZM7 10C7 7.24 9.24 5 12 5C14.76 5 17 7.24 17 10C17 12.88 14.12 17.19 12 19.88C9.92 17.21 7 12.85 7 10Z"
        fill={(theme.colors.teal as any)['400']}
      />
      <path
        d="M12 12.5C13.3807 12.5 14.5 11.3807 14.5 10C14.5 8.61929 13.3807 7.5 12 7.5C10.6193 7.5 9.5 8.61929 9.5 10C9.5 11.3807 10.6193 12.5 12 12.5Z"
        fill={(theme.colors.teal as any)['400']}
      />
      <path
        d="M25.448 14.27C25.448 17.086 27.192 18.878 29.384 18.878C30.696 18.878 31.64 18.286 32.136 17.47V18.75H34.872V6.91H32.136V11.054C31.592 10.238 30.568 9.694 29.384 9.694C27.192 9.694 25.448 11.454 25.448 14.27ZM32.136 14.286C32.136 15.71 31.224 16.494 30.184 16.494C29.16 16.494 28.232 15.694 28.232 14.27C28.232 12.846 29.16 12.078 30.184 12.078C31.224 12.078 32.136 12.862 32.136 14.286ZM40.7874 11.886C41.6994 11.886 42.4674 12.446 42.4674 13.422H39.0434C39.2034 12.43 39.8914 11.886 40.7874 11.886ZM45.0594 15.79H42.1474C41.9234 16.27 41.4914 16.654 40.7234 16.654C39.8434 16.654 39.1234 16.11 39.0274 14.942H45.2194C45.2514 14.67 45.2674 14.398 45.2674 14.142C45.2674 11.422 43.4274 9.694 40.8194 9.694C38.1634 9.694 36.3074 11.454 36.3074 14.286C36.3074 17.118 38.1954 18.878 40.8194 18.878C43.0434 18.878 44.6274 17.534 45.0594 15.79ZM59.0148 18.75H61.7348V13.534C61.7348 11.134 60.3108 9.726 58.1028 9.726C56.8068 9.726 55.6868 10.446 55.0948 11.39C54.4868 10.318 53.3988 9.726 52.0548 9.726C50.8868 9.726 49.9748 10.222 49.4468 10.942V9.822H46.7108V18.75H49.4468V13.902C49.4468 12.734 50.1188 12.094 51.1588 12.094C52.1988 12.094 52.8708 12.734 52.8708 13.902V18.75H55.5908V13.902C55.5908 12.734 56.2628 12.094 57.3028 12.094C58.3428 12.094 59.0148 12.734 59.0148 13.902V18.75ZM72.3843 14.286C72.3843 11.454 70.3683 9.694 67.7443 9.694C65.1363 9.694 63.1043 11.454 63.1043 14.286C63.1043 17.118 65.0883 18.878 67.7123 18.878C70.3363 18.878 72.3843 17.118 72.3843 14.286ZM65.8883 14.286C65.8883 12.766 66.7523 12.062 67.7443 12.062C68.7043 12.062 69.6003 12.766 69.6003 14.286C69.6003 15.79 68.6883 16.51 67.7123 16.51C66.7203 16.51 65.8883 15.79 65.8883 14.286ZM76.6824 14.27C76.6824 17.086 78.4264 18.878 80.6024 18.878C81.9304 18.878 82.8744 18.27 83.3704 17.486V18.75H86.1064V9.822H83.3704V11.086C82.8904 10.302 81.9464 9.694 80.6184 9.694C78.4264 9.694 76.6824 11.454 76.6824 14.27ZM83.3704 14.286C83.3704 15.71 82.4584 16.494 81.4184 16.494C80.3944 16.494 79.4664 15.694 79.4664 14.27C79.4664 12.846 80.3944 12.078 81.4184 12.078C82.4584 12.078 83.3704 12.862 83.3704 14.286ZM90.8218 11.086V9.822H88.0858V23.006H90.8218V17.502C91.3177 18.254 92.2618 18.878 93.5738 18.878C95.7658 18.878 97.5098 17.086 97.5098 14.27C97.5098 11.454 95.7658 9.694 93.5738 9.694C92.2618 9.694 91.3177 10.302 90.8218 11.086ZM94.7258 14.27C94.7258 15.694 93.7978 16.494 92.7578 16.494C91.7338 16.494 90.8058 15.71 90.8058 14.286C90.8058 12.862 91.7338 12.078 92.7578 12.078C93.7978 12.078 94.7258 12.846 94.7258 14.27ZM101.681 11.086V9.822H98.9451V23.006H101.681V17.502C102.177 18.254 103.121 18.878 104.433 18.878C106.625 18.878 108.369 17.086 108.369 14.27C108.369 11.454 106.625 9.694 104.433 9.694C103.121 9.694 102.177 10.302 101.681 11.086ZM105.585 14.27C105.585 15.694 104.657 16.494 103.617 16.494C102.593 16.494 101.665 15.71 101.665 14.286C101.665 12.862 102.593 12.078 103.617 12.078C104.657 12.078 105.585 12.846 105.585 14.27Z"
        fill="currentColor"
      />
    </>
  ),
})

type Props = IconProps

export const Logo: React.VFC<Props> = (props) => {
  return <LogoIcon color="whiteAlpha" w="auto" h="1.5em" ml="-2px" {...props} />
}
