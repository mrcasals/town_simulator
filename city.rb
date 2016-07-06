class City
  def initialize
    @food = 500000
    @people = []
    10.times { @people << Person.new(rand(15..35)) }
  end

  def turn
    @food -= @people.count * 12 # people need to eat
    @people.each do |person|
      person.get_older!
    end

    inspect
  end

  def inspect
    a = @people.map do |person|
      "#{person.age}#{person.gender[0]}"
    end
    p a
    p "Remaining food: #{@food}"
  end
end

class Person
  GENDERS = [:male, :female]

  attr_reader :age, :gender

  def initialize(age = 0)
    @age = age
    @gender = GENDERS.sample
  end

  def get_older!
    @age += 1
  end

  def male?
    @gender == :male
  end

  def female?
    @gender == :female
  end
end