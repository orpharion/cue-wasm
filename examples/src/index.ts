import cuePromise from './global'

cuePromise.then(cue => cue.eval({cwd: "/"}))