FROM reactnativecommunity/react-native-android

WORKDIR /usr/app

COPY package.json yarn.lock  ./

RUN yarn install

RUN yarn global add expo-cli

COPY . .

EXPOSE  19006

EXPOSE 5037

EXPOSE  19001

EXPOSE  19002

ENV ADB_IP="192.168.15.6"
ENV REACT_NATIVE_PACKAGER_HOSTNAME="192.168.15.6"


RUN apt-get update && \ 
    apt-get install -y software-properties-common

RUN sed -i "/^# deb.*universe/ s/^# //" /etc/apt/sources.list

    
RUN apt-get install -y android-tools-adb

RUN  /usr/lib/android-sdk/platform-tools/adb kill-server

CMD  /usr/lib/android-sdk/platform-tools/adb connect $ADB_IP && \
    yarn run android
