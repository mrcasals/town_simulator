# Town simulator

[Demo](http://townsimulator.surge.sh)

A small town simulator. These are its features:

- [x] Citizens get older
- [x] Citizens get random genders
- [x] Citizens eat
- [x] Citizens get random names
- [x] Citizens die at a certain given age (65 years old)
- [x] Citizens form families
- [x] Citizens make babies
- [ ] Citizens generate food
- [ ] Citizens start with random food
- [ ] Citizens die at random ages, most probably when babies or when very old
- [ ] Citizens get jobs that might increase their chances to die (hunters, for example)
- [ ] Citizens build improvements in the land to make their life easier

Later on, I'll need to make this data visually easier, so I might need to
integrate this project with a game engine or something.

## Instructions

This project uses https://pnpm.io.

```
pnpm install
pnpm dev
```

Visit <http://127.0.0.1:5173/> and watch it run!

## Testing

`pnpm test` - Run all test suites
`pnpm test:coverage` - Generate test coverage reports. These can then be explored in the browser by running `pnpm dev` and then visiting <http://127.0.0.1:5173/coverage/>.

## Deploy your own version

If you want to deploy your own version of the code:

1. fork the repo
2. modify the `config/CNAME` file
3. run `pnpm install`
4. run `pnpm build && pnpm preview` to see try the built project at <http://127.0.0.1:4173/>
5. Finally, when you're happy with the result, run `pnpm run deploy`.
