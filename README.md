# same-time-search

Chrome extension to search on multiple sites at the same time

![2021-07-25 21_02_32-](https://user-images.githubusercontent.com/43720583/126902892-51f8c88d-69ae-4a8c-b3a5-3dc793c4f140.png)
![2021-07-25 21_01_21-Same Time Search](https://user-images.githubusercontent.com/43720583/126902893-bcfb5849-e0d3-4582-ba01-6856939aa462.png)

# Build

```
yarn install --frozen-lockfile
yarn build
```

Load the build directory as an extension in Google Chrome
[Create and publish custom Chrome apps & extensions \- Google Chrome Enterprise Help](https://support.google.com/chrome/a/answer/2714278?hl=en&ref_topic=4412375)

# Watch src directory

```
yarn watch:build
```

Run build if there are any changes in the src directory
