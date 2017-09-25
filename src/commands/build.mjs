import rollup from 'rollup'
import babel from 'rollup-plugin-babel'

export default function build(name) {
  console.log(name)
  const baseConfig = {
    input: 'src/main.js',
    ouput: {
      file: 'bundle.js',
      format: 'cjs'
    },
    plugins: [
      babel({
        exclude: 'node_modules/**'
      })
    ]
  }
}