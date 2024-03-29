#
# TODO:
#
# * ON/OFF are special cases, lets build a separate compiler step that generates two
#   seaprate interfaces and inserts the relevant documentation inside of there.
#
require 'json'

IN_FILE = 'dist/api.raw.d.ts'.freeze
OUT_FILE = 'ts/api.ts'.freeze

filtered_lines = []

MANGLED_LINE = /\} function/

def clean(line)
  line.gsub!('export default', 'declare')
  line.gsub!('export interface', 'interface')
  line.gsub!('export', '')
  line.slice!(0, 1) # Trim leading whitespace
  line.chomp!
  line
end

#
# The default output of the file wraps everything in modules. Let's flatten and
# ensure that everything from the functions directory ends up as globals in this
# d.ts file.
#
File.readlines(IN_FILE, :encoding => 'UTF-8').each do |line|
  next if line == "\t"
  next if %w[d }].include? line[0]
  next if line.include?('import')
  next if line.include?('export {}')
  next if line.include?('export default') && !line.include?('function')
  next if line.include?('/* noexport */')

  if line =~ MANGLED_LINE
    functions = line.split('}').last.split(';').map(&:strip).map { |l| clean(" " + l) }
    filtered_lines.push('}', *functions)
  else
    filtered_lines.push clean(line.chomp)
  end
end

final_lines = []

OVERLOAD_LINE = /declare function/

DOCUMENTATION_BEGIN = '/**'

DOCUMENTATION_END = '*/'

#
# So we don't have to duplicate _every_ single JSDoc, if we walk across duplicate
# `declare function` calls, let's walk backwards and find the documentation and insert
# it before we insert the function declaration.
#
# We need to make a new collection so we can reference the structure of the original.
#
filtered_lines.each_with_index do |current_line, index|
  final_lines.push(current_line) && next if index.zero?

  previous_line = filtered_lines[index - 1]

  if current_line =~ OVERLOAD_LINE && previous_line =~ OVERLOAD_LINE
    i = index - 1
    documentation = []
    documenting = false

    # Start walking backwards looking for documentation
    loop do
      line = filtered_lines[i]
      if line.include?(DOCUMENTATION_END)
        documenting = true
        documentation.unshift(line)
      elsif line.include?(DOCUMENTATION_BEGIN)
        documentation.unshift(line)
        break
      elsif documenting
        documentation.unshift(line)
      end

      i -= 1
    end

    final_lines.push(*documentation)
  end

  final_lines.push(current_line)
end

# File.open("final.txt", "w+") do |f|
#   final_lines.each { |line| f.write("#{line}\n") }
# end

File.open(OUT_FILE, 'w+') do |file|
  file.write("export default `\n#{final_lines.join("\n").gsub("`", '\\\\`')}\n`;")
end
